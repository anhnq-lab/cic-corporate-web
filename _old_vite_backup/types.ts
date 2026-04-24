import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  imageUrl: string;
  excerpt?: string;
  content?: string;
  author?: string;
  videoUrl?: string; // YouTube ID or direct URL
  audioUrl?: string;
  attachments?: {
    name: string;
    url: string;
    size: string;
    type: 'pdf' | 'doc' | 'other';
  }[];
}

export interface RoleCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  ctaText: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  type: 'software' | 'service';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  ctaText: string;
}

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
}