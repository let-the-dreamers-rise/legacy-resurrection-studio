import { NextRequest, NextResponse } from 'next/server';
import { convertLegacyUI } from '@/lib/ui';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.html) {
      return NextResponse.json(
        { error: 'Missing required field: html' },
        { status: 400 }
      );
    }

    const result = await convertLegacyUI(body.html, {
      componentStyle: 'functional',
      stateManagement: 'useState',
      typescript: true,
      preserveIds: false,
      targetFramework: 'next',
      styling: 'tailwind',
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('UI conversion error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
