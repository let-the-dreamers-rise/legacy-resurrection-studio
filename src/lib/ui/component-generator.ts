import type { ReactComponent, ConversionOptions, StateVariable, ApiCall, EventHandler, ComponentStructure } from './types';
import { analyzeComponentStructure } from './index';

export function generateReactComponent(
  html: string,
  componentName: string,
  options: ConversionOptions
): ReactComponent {
  const dependencies: string[] = ['react'];
  const stateVariables: StateVariable[] = [];
  const apiCalls: ApiCall[] = [];
  const eventHandlers: EventHandler[] = [];

  const structure: ComponentStructure = analyzeComponentStructure(html);

  // Extract state from jQuery variables
  const stateMatches = html.matchAll(/var\s+(\w+)\s*=\s*([^;]+);/g);
  for (const match of stateMatches) {
    const varName = match[1];
    const initialValue = match[2].trim();
    
    if (varName !== 'apiEndpoint' && varName !== 'authToken') {
      stateVariables.push({
        name: varName,
        type: inferType(initialValue),
        initialValue: convertInitialValue(initialValue),
        usage: findVariableUsage(html, varName)
      });
    }
  }

  // Extract API calls
  const ajaxMatches = html.matchAll(/\$\.ajax\(\{([^}]+)\}\)/gs);
  for (const match of ajaxMatches) {
    const ajaxConfig = match[1];
    const urlMatch = ajaxConfig.match(/url:\s*['"]?([^'"]+)['"]?/);
    const methodMatch = ajaxConfig.match(/method:\s*['"](\w+)['"]/);
    
    if (urlMatch) {
      const endpoint = urlMatch[1];
      const method = (methodMatch?.[1] || 'GET').toUpperCase() as ApiCall['method'];
      
      apiCalls.push({
        name: generateApiCallName(endpoint, method),
        method,
        endpoint: endpoint.replace(/apiEndpoint\s*\+\s*['"]/, ''),
        purpose: inferApiPurpose(endpoint, method),
        modernImplementation: generateModernApiCall(endpoint, method)
      });
    }
  }

  // Extract event handlers
  const eventMatches = html.matchAll(/\$\(['"]([^'"]+)['"]\)\.(click|submit|change)\(function\([^)]*\)\s*\{([^}]+)\}/gs);
  for (const match of eventMatches) {
    const selector = match[1];
    const event = match[2];
    const code = match[3];
    
    eventHandlers.push({
      name: generateEventHandlerName(selector, event),
      trigger: `${event} on ${selector}`,
      originalCode: code.trim(),
      modernImplementation: convertEventHandler(event)
    });
  }

  // Generate clean JSX (NO legacy HTML)
  const cleanJsx = convertToCleanJsx(html, componentName);

  const code = options.typescript
    ? generateTypeScriptComponent(componentName, cleanJsx, stateVariables, apiCalls, eventHandlers, structure)
    : generateJavaScriptComponent(componentName, cleanJsx, stateVariables, apiCalls, eventHandlers, structure);

  return {
    name: componentName,
    filePath: `src/components/${componentName}.${options.typescript ? 'tsx' : 'jsx'}`,
    code,
    dependencies: [...new Set([...dependencies, ...getRequiredDependencies(structure)])],
    propsInterface: options.typescript ? generatePropsInterface(componentName) : undefined,
    stateVariables,
    apiCalls,
    eventHandlers
  };
}

function convertToCleanJsx(html: string, componentName: string): string {
  // STEP 1: STRIP ALL LEGACY TRASH
  let clean = html;
  
  // Remove DOCTYPE, html, head, body tags
  clean = clean.replace(/<!DOCTYPE[^>]*>/gi, '');
  clean = clean.replace(/<\/?html[^>]*>/gi, '');
  clean = clean.replace(/<head[\s\S]*?<\/head>/gi, '');
  clean = clean.replace(/<\/?body[^>]*>/gi, '');
  
  // Remove all script tags
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  // Remove all style tags
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, '');
  
  // Remove all link tags (CDN imports)
  clean = clean.replace(/<link[^>]*>/gi, '');
  
  // Remove comments
  clean = clean.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remove inline event handlers
  clean = clean.replace(/\s+on\w+="[^"]*"/gi, '');
  clean = clean.replace(/\s+on\w+='[^']*'/gi, '');
  
  // STEP 2: EXTRACT FORM STRUCTURE
  const formMatch = clean.match(/<form[^>]*>([\s\S]*?)<\/form>/i);
  const formContent = formMatch ? formMatch[1] : clean;
  
  // Extract title from panel-title or h3
  const titleMatch = clean.match(/<h\d[^>]*class="[^"]*panel-title[^"]*"[^>]*>([^<]+)<\/h\d>/i) ||
                     clean.match(/<h\d[^>]*>([^<]+)<\/h\d>/i);
  const title = titleMatch ? titleMatch[1].trim() : componentName.replace(/([A-Z])/g, ' $1').trim();
  
  // Extract form inputs
  const inputs = extractFormInputs(formContent);
  
  // STEP 3: BUILD CLEAN SPOOKY JSX
  const inputsJsx = inputs.map(input => {
    const fieldName = input.id || input.name || 'field';
    const label = input.label || capitalize(fieldName);
    const type = input.type || 'text';
    const placeholder = input.placeholder || `Enter ${label.toLowerCase()}`;
    
    return `
        <div>
          <label htmlFor="${fieldName}" className="block text-sm font-medium text-pink-300 mb-1">
            ${label}
          </label>
          <input
            type="${type}"
            id="${fieldName}"
            value={${fieldName}}
            onChange={(e) => set${capitalize(fieldName)}(e.target.value)}
            placeholder="${placeholder}"
            className="w-full px-3 py-2 rounded-lg border border-pink-500/40 bg-black/40 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>`;
  }).join('\n');
  
  // Extract buttons
  const hasSubmit = /<button[^>]*type="submit"/i.test(formContent) || /<input[^>]*type="submit"/i.test(formContent);
  const hasCancel = /cancel|reset/i.test(formContent);
  
  const buttonsJsx = `
        <div className="flex gap-3">
          ${hasSubmit ? `<button
            type="submit"
            className="flex-1 px-4 py-2 rounded-full bg-pink-600 text-zinc-50 border border-pink-400/50 hover:bg-pink-500 font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Submit
          </button>` : ''}
          ${hasCancel ? `<button
            type="button"
            onClick={() => {/* Reset form */}}
            className="px-4 py-2 rounded-full bg-transparent border border-zinc-600 text-zinc-200 hover:bg-zinc-900/70 font-medium transition focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Cancel
          </button>` : ''}
        </div>`;
  
  // Build final clean JSX
  return `
      <div className="flex items-center gap-3 mb-6">
        <Ghost className="text-pink-400 animate-[float-soft_6s_ease-in-out_infinite]" size={28} />
        <h2 className="text-pink-300 text-2xl font-bold">${title}</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        ${inputsJsx}
        ${buttonsJsx}
      </form>

      {message && (
        <div className={\`mt-4 p-3 rounded-lg border \${
          messageType === 'success' 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
            : 'bg-red-950/40 border-red-500/50 text-red-200'
        }\`}>
          {message}
        </div>
      )}`;
}

interface FormInput {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
}

function extractFormInputs(html: string): FormInput[] {
  const inputs: FormInput[] = [];
  const inputRegex = /<input[^>]*>/gi;
  const matches = html.matchAll(inputRegex);
  
  for (const match of matches) {
    const inputTag = match[0];
    
    // Skip submit/button inputs
    if (/type="submit"|type="button"/i.test(inputTag)) continue;
    
    const id = inputTag.match(/id="([^"]*)"/i)?.[1];
    const name = inputTag.match(/name="([^"]*)"/i)?.[1];
    const type = inputTag.match(/type="([^"]*)"/i)?.[1] || 'text';
    const placeholder = inputTag.match(/placeholder="([^"]*)"/i)?.[1];
    
    // Find label
    const labelRegex = new RegExp(`<label[^>]*for="${id}"[^>]*>([^<]+)</label>`, 'i');
    const labelMatch = html.match(labelRegex);
    const label = labelMatch?.[1]?.trim();
    
    if (id || name) {
      inputs.push({ id, name, type, label, placeholder });
    }
  }
  
  return inputs;
}

function generateTypeScriptComponent(
  name: string,
  jsx: string,
  _stateVars: StateVariable[],
  _apiCalls: ApiCall[],
  _eventHandlers: EventHandler[],
  _structure: ComponentStructure
): string {
  // Extract field names from JSX
  const fieldMatches = jsx.matchAll(/value=\{(\w+)\}/g);
  const fields = [...new Set([...fieldMatches].map(m => m[1]))];
  
  const stateDeclarations = fields.map(field => 
    `const [${field}, set${capitalize(field)}] = useState("");`
  ).join('\n  ');
  
  const messageState = jsx.includes('message') ? `
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');` : '';

  return `import { useState } from "react";
import { Ghost } from "lucide-react";

interface ${name}Props {
  // Add your props here
}

export function ${name}({}: ${name}Props) {
  ${stateDeclarations}${messageState}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with your API endpoint
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ${fields.join(', ')} }),
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      ${messageState ? `setMessage('Success!');
      setMessageType('success');` : '// Handle success'}
    } catch (error) {
      console.error('Error:', error);
      ${messageState ? `setMessage('An error occurred');
      setMessageType('error');` : '// Handle error'}
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-zinc-900/70 rounded-xl border border-pink-600/40 shadow-[0_0_15px_rgba(255,0,122,0.3)] backdrop-blur">
      ${jsx}
    </div>
  );
}
`;
}

function generateJavaScriptComponent(
  name: string,
  jsx: string,
  _stateVars: StateVariable[],
  _apiCalls: ApiCall[],
  _eventHandlers: EventHandler[],
  _structure: ComponentStructure
): string {
  const fieldMatches = jsx.matchAll(/value=\{(\w+)\}/g);
  const fields = [...new Set([...fieldMatches].map(m => m[1]))];
  
  const stateDeclarations = fields.map(field => 
    `const [${field}, set${capitalize(field)}] = useState("");`
  ).join('\n  ');
  
  const messageState = jsx.includes('message') ? `
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState('success');` : '';

  return `import { useState } from "react";
import { Ghost } from "lucide-react";

export function ${name}({}) {
  ${stateDeclarations}${messageState}

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ${fields.join(', ')} }),
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      ${messageState ? `setMessage('Success!');
      setMessageType('success');` : '// Handle success'}
    } catch (error) {
      console.error('Error:', error);
      ${messageState ? `setMessage('An error occurred');
      setMessageType('error');` : '// Handle error'}
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-zinc-900/70 rounded-xl border border-pink-600/40 shadow-[0_0_15px_rgba(255,0,122,0.3)] backdrop-blur">
      ${jsx}
    </div>
  );
}
`;
}

function generatePropsInterface(name: string): string {
  return `interface ${name}Props {
  // Add your props here
}`;
}

function inferType(value: string): string {
  if (value === '[]') return 'any[]';
  if (value.match(/^\d+$/)) return 'number';
  if (value.match(/^['"].*['"]$/)) return 'string';
  if (value === 'true' || value === 'false') return 'boolean';
  if (value === '{}') return 'Record<string, any>';
  return 'any';
}

function convertInitialValue(value: string): string {
  if (value === '[]') return '[]';
  if (value === '{}') return '{}';
  return value;
}

function findVariableUsage(html: string, varName: string): string[] {
  const regex = new RegExp(`\\b${varName}\\b`, 'g');
  const matches = html.match(regex);
  return matches ? [`Used ${matches.length} times`] : [];
}

function generateApiCallName(endpoint: string, method: string): string {
  const parts = endpoint.split('/').filter(p => p && !p.includes('api'));
  const resource = parts[parts.length - 1] || 'data';
  
  if (method === 'GET') return `load${capitalize(resource)}`;
  if (method === 'POST') return `create${capitalize(resource)}`;
  if (method === 'PUT' || method === 'PATCH') return `update${capitalize(resource)}`;
  if (method === 'DELETE') return `delete${capitalize(resource)}`;
  return `fetch${capitalize(resource)}`;
}

function inferApiPurpose(endpoint: string, method: string): string {
  const resource = endpoint.split('/').pop() || 'resource';
  
  if (method === 'GET') return `Load ${resource}`;
  if (method === 'POST') return `Create ${resource}`;
  if (method === 'PUT' || method === 'PATCH') return `Update ${resource}`;
  if (method === 'DELETE') return `Delete ${resource}`;
  return `Fetch ${resource}`;
}

function generateModernApiCall(endpoint: string, method: string): string {
  const cleanEndpoint = endpoint.replace(/apiEndpoint\s*\+\s*['"]/, '');
  
  if (method === 'GET') {
    return `const response = await fetch('${cleanEndpoint}');
      const data = await response.json();
      // TODO: Update state with data`;
  }
  
  return `const response = await fetch('${cleanEndpoint}', {
        method: '${method}',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(/* your data */)
      });
      const data = await response.json();
      // TODO: Handle response`;
}

function generateEventHandlerName(selector: string, event: string): string {
  const cleanSelector = selector.replace(/[#.]/g, '');
  return `handle${capitalize(cleanSelector)}${capitalize(event)}`;
}

function convertEventHandler(event: string): string {
  if (event === 'submit') {
    return `(e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
  }`;
  }
  
  return `() => {
    // TODO: Implement ${event} handler
  }`;
}

function getRequiredDependencies(structure: ComponentStructure): string[] {
  const deps: string[] = [];
  if (structure.hasState) deps.push('useState');
  if (structure.hasEffects) deps.push('useEffect');
  if (structure.hasApiCalls) deps.push('useCallback');
  return deps;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
