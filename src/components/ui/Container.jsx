import cn from '../../utils/cn';

export default function Container({ className = '', children, as: As = 'div', size = 'default' }) {
  const max = size === 'narrow' ? 'max-w-4xl' : size === 'wide' ? 'max-w-7xl' : 'max-w-6xl';
  return <As className={cn('mx-auto w-full container-px', max, className)}>{children}</As>;
}
