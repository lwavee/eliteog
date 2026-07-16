import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const getSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkeyforeliteopsglobalenterprise2026', {
    expiresIn: (process.env.JWT_EXPIRE || '30d') as any,
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    const token = getSignedToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await (user as any).matchPassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = getSignedToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Server Error' });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Server Error' });
  }
};

// Automatic seeding of first admin if none exists
export const seedAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      res.status(400).json({ success: false, message: 'Seeding not required. Admins already exist.' });
      return;
    }

    const admin = await User.create({
      username: 'admin',
      email: 'admin@eliteopsglobal.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      message: 'Default admin seeded successfully',
      credentials: {
        email: 'admin@eliteopsglobal.com',
        password: 'adminpassword123',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Server Error' });
  }
};
