import React from 'react';
import { PortfolioData } from '@/lib/store';

interface TemplateProps {
  data: PortfolioData;
}

const BasicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{ padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>{data.name}</h1>
      <p>{data.role}</p>
      <p>{data.bio}</p>
      <h2>Services</h2>
      <ul>{data.services?.map(s => <li key={s}>{s}</li>)}</ul>
      <h2>Projects</h2>
      <ul>{data.projects?.map(p => <li key={p.title}>{p.title}</li>)}</ul>
    </div>
  );
};

export default BasicTemplate;
