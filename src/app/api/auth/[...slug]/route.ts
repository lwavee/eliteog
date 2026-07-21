import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';

const getSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkeyforeliteopsglobalenterprise2026', {
    expiresIn: (process.env.JWT_EXPIRE || '30d') as any,
  });
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  await connectToDatabase();
  const slug = (await params).slug;

  try {
    if (slug[0] === 'me') {
      const decoded = verifyAuth(req);
      if (!decoded) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  await connectToDatabase();
  const slug = (await params).slug;
  const body = await req.json().catch(() => ({}));

  try {
    if (slug[0] === 'login') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ success: false, message: 'Please provide email and password' }, { status: 400 });
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await (user as any).matchPassword(password))) {
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
      }

      const token = getSignedToken(user._id.toString());
      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      }, { status: 200 });
    }

    if (slug[0] === 'seed') {
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        return NextResponse.json({ success: false, message: 'Seeding not required. Admins already exist.' }, { status: 400 });
      }

      const admin = await User.create({
        username: 'admin',
        email: 'admin@eliteopsglobal.com',
        password: 'adminpassword123',
        role: 'admin',
      });

      return NextResponse.json({
        success: true,
        message: 'Default admin seeded successfully',
        credentials: {
          email: 'admin@eliteopsglobal.com',
          password: 'adminpassword123',
        },
      }, { status: 201 });
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
