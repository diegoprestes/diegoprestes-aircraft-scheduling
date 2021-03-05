import { ReactNode } from 'react';
import './styles.css';

interface ListProps {
  children: ReactNode;
  styleModifier?: string;
}

export default function List(props:ListProps) {
  return (
    <div className={`list ${props.styleModifier ? props.styleModifier : ''}`}>
      {props.children}
    </div>
  );
}
