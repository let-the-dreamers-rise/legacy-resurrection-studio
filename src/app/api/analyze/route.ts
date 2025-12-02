import { NextRequest, NextResponse } from 'next/server';
import { analyzeLegacyCode } from '@/lib/analysis';
import type { CodeFile } from '@/lib/analysis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.code) {
      return NextResponse.json(
        { error: 'Missing required field: code' },
        { status: 400 }
      );
    }

    const files: CodeFile[] = [
      {
        path: 'input.html',
        content: body.code,
        type: 'html',
      },
    ];

    const report = await analyzeLegacyCode(files, { depth: 'standard' });

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Analysis API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
