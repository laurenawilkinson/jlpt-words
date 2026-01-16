import { IconMinus, IconPlus } from '@tabler/icons-preact';
import IconButton from './IconButton';

interface SteppedNumberInputProps {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

export const SteppedNumberInput = ({
  value,
  setValue,
  min = 0,
  max,
}: SteppedNumberInputProps) => {
  return (
    <div className="flex items-center font-medium">
      <IconButton
        size="sm"
        disabled={value === min}
        onClick={() => setValue(value > min ? value - 1 : value)}
      >
        <IconMinus />
      </IconButton>
      <span className="w-4 text-center">{value}</span>
      <IconButton
        size="sm"
        disabled={value === max}
        onClick={() =>
          setValue(!max || (max && value < max) ? value + 1 : value)
        }
      >
        <IconPlus />
      </IconButton>
    </div>
  );
};
