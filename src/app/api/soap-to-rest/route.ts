import { NextRequest, NextResponse } from 'next/server';
import { convertSoapToRest } from '@/lib/soap';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.wsdl) {
      return NextResponse.json(
        { error: 'Missing required field: wsdl' },
        { status: 400 }
      );
    }

    const result = await convertSoapToRest(body.wsdl, {
      generateStubs: true,
      targetFramework: 'nextjs',
      authStrategy: 'none',
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('SOAP to REST conversion error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
