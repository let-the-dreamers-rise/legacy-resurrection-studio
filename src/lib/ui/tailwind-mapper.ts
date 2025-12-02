const BOOTSTRAP_TO_TAILWIND: Record<string, string> = {
  // Layout
  'container': 'container mx-auto px-4',
  'container-fluid': 'w-full px-4',
  'row': 'flex flex-wrap -mx-4',
  'col': 'flex-1 px-4',
  'col-1': 'w-1/12 px-4',
  'col-2': 'w-2/12 px-4',
  'col-3': 'w-3/12 px-4',
  'col-4': 'w-4/12 px-4',
  'col-5': 'w-5/12 px-4',
  'col-6': 'w-6/12 px-4',
  'col-7': 'w-7/12 px-4',
  'col-8': 'w-8/12 px-4',
  'col-9': 'w-9/12 px-4',
  'col-10': 'w-10/12 px-4',
  'col-11': 'w-11/12 px-4',
  'col-12': 'w-full px-4',
  'col-md-6': 'w-full md:w-1/2 px-4',
  'col-md-4': 'w-full md:w-1/3 px-4',
  'col-md-3': 'w-full md:w-1/4 px-4',
  'col-lg-6': 'w-full lg:w-1/2 px-4',
  'col-lg-4': 'w-full lg:w-1/3 px-4',
  'col-lg-3': 'w-full lg:w-1/4 px-4',

  // Buttons - Spooky Theme
  'btn': 'px-4 py-2 rounded-full font-medium transition-colors duration-300 border',
  'btn-primary': 'bg-pink-600 text-zinc-50 border-pink-400/50 hover:bg-pink-500',
  'btn-secondary': 'bg-transparent border-zinc-600 text-zinc-200 hover:bg-zinc-900/70',
  'btn-success': 'bg-emerald-600 text-zinc-50 border-emerald-400/50 hover:bg-emerald-500',
  'btn-danger': 'bg-red-700 text-zinc-50 border-red-400/50 hover:bg-red-600',
  'btn-warning': 'bg-yellow-600 text-zinc-50 border-yellow-400/50 hover:bg-yellow-500',
  'btn-info': 'bg-violet-600 text-zinc-50 border-violet-400/50 hover:bg-violet-500',
  'btn-light': 'bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700',
  'btn-dark': 'bg-zinc-950 text-zinc-100 border-zinc-700 hover:bg-zinc-900',
  'btn-lg': 'px-6 py-3 text-lg',
  'btn-sm': 'px-3 py-1.5 text-sm',

  // Cards - Spooky Theme
  'card': 'bg-zinc-900/70 rounded-xl border border-pink-600/40 shadow-[0_0_15px_rgba(255,0,122,0.3)] backdrop-blur overflow-hidden',
  'card-body': 'p-6',
  'card-header': 'px-6 py-4 border-b border-pink-500/30 bg-zinc-950/50',
  'card-footer': 'px-6 py-4 border-t border-pink-500/30 bg-zinc-950/50',
  'card-title': 'text-xl font-semibold mb-2 text-pink-300',
  'card-text': 'text-zinc-300',

  // Forms - Spooky Theme
  'form-control': 'w-full px-3 py-2 rounded-lg border border-pink-500/40 bg-black/40 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500',
  'form-label': 'block text-sm font-medium text-pink-300 mb-1',
  'form-group': 'mb-4',
  'form-check': 'flex items-center',
  'form-check-input': 'mr-2',
  'form-check-label': 'text-sm text-zinc-300',

  // Alerts - Spooky Theme
  'alert': 'p-4 rounded-lg border',
  'alert-success': 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200',
  'alert-danger': 'bg-red-950/40 border-red-500/50 text-red-200',
  'alert-warning': 'bg-yellow-950/40 border-yellow-500/50 text-yellow-200',
  'alert-info': 'bg-violet-950/40 border-violet-500/50 text-violet-200',

  // Display
  'd-none': 'hidden',
  'd-block': 'block',
  'd-inline': 'inline',
  'd-inline-block': 'inline-block',
  'd-flex': 'flex',
  'd-inline-flex': 'inline-flex',
  'd-grid': 'grid',

  // Flexbox
  'justify-content-start': 'justify-start',
  'justify-content-end': 'justify-end',
  'justify-content-center': 'justify-center',
  'justify-content-between': 'justify-between',
  'justify-content-around': 'justify-around',
  'align-items-start': 'items-start',
  'align-items-end': 'items-end',
  'align-items-center': 'items-center',
  'align-items-baseline': 'items-baseline',
  'align-items-stretch': 'items-stretch',
  'flex-row': 'flex-row',
  'flex-column': 'flex-col',
  'flex-wrap': 'flex-wrap',
  'flex-nowrap': 'flex-nowrap',

  // Spacing
  'm-0': 'm-0',
  'm-1': 'm-1',
  'm-2': 'm-2',
  'm-3': 'm-3',
  'm-4': 'm-4',
  'm-5': 'm-5',
  'mt-3': 'mt-3',
  'mb-3': 'mb-3',
  'ml-3': 'ml-3',
  'mr-3': 'mr-3',
  'p-0': 'p-0',
  'p-1': 'p-1',
  'p-2': 'p-2',
  'p-3': 'p-3',
  'p-4': 'p-4',
  'p-5': 'p-5',

  // Text
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-muted': 'text-gray-500',
  'text-primary': 'text-blue-600',
  'text-success': 'text-green-600',
  'text-danger': 'text-red-600',
  'text-warning': 'text-yellow-600',
  'text-info': 'text-cyan-600',
  'font-weight-bold': 'font-bold',
  'font-weight-normal': 'font-normal',
  'font-weight-light': 'font-light',

  // Navbar
  'navbar': 'bg-gray-800 text-white',
  'navbar-brand': 'text-xl font-bold',
  'navbar-nav': 'flex space-x-4',
  'nav-link': 'hover:text-gray-300 transition-colors',
};

export function convertBootstrapToTailwind(bootstrapClasses: string): string {
  const classes = bootstrapClasses.split(/\s+/);
  const tailwindClasses: string[] = [];

  classes.forEach((cls) => {
    if (BOOTSTRAP_TO_TAILWIND[cls]) {
      tailwindClasses.push(BOOTSTRAP_TO_TAILWIND[cls]);
    } else {
      tailwindClasses.push(cls);
    }
  });

  return tailwindClasses.join(' ');
}
