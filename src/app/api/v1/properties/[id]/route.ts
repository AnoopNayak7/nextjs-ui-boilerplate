import { NextRequest, NextResponse } from 'next/server';
import { propertiesApi } from '@/lib/api';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const response = await propertiesApi.getById(id);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Error fetching property ${params.id}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to fetch property' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const data = await request.json();
    const response = await propertiesApi.update(id, data);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Error updating property ${params.id}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to update property' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const response = await propertiesApi.delete(id);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(`Error deleting property ${params.id}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to delete property' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}