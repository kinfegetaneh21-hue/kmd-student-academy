import cn from '../../utils/cn';

export default function Badge({ variant = 'slate', className = '', children }) {
  const styles = {
    slate: 'chip-slate',
    brand: 'chip-brand',
    accent: 'chip-accent',
    success: 'chip-success',
  };
  return <span className={cn(styles[variant], className)}>{children}</span>;
}
