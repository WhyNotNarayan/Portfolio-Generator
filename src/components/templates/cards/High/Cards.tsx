import React from 'react';
import { PortfolioData } from '@/lib/store';
import Card1Template from './Card1';
import Card2Template from './Card2';
import Card3Template from './Card3';
import Card4Template from './Card4';

export const Card1: React.FC<{ data: PortfolioData }> = ({ data }) => <Card1Template data={data} />;
export const Card2: React.FC<{ data: PortfolioData }> = ({ data }) => <Card2Template data={data} />;
export const Card3: React.FC<{ data: PortfolioData }> = ({ data }) => <Card3Template data={data} />;
export const Card4: React.FC<{ data: PortfolioData }> = ({ data }) => <Card4Template data={data} />;
