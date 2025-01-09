import { useRef } from 'react';

const keys = [
  [[1], [2, 'a', 'b', 'c'], [3, 'd', 'e', 'f']],
  [
    [4, 'g', 'h', 'i'],
    [5, 'j', 'k', 'l'],
    [6, 'm', 'n', 'o'],
  ],
  [
    [7, 'p', 'q', 'r', 's'],
    [8, 't', 'u', 'v'],
    [9, 'w', 'x', 'y', 'z'],
  ],
  [['*'], [0, '+'], ['#']],
];

export default function KeyBroad(props: { onChange: (value: string, isAdd: boolean) => void }) {
  const { onChange } = props;
  const countRef = useRef(-1);
  const prevKeyRef = useRef<string>('');
  const handleKeyClick = (key: string, item: string[]) => {
    const { length } = item;
    if (prevKeyRef.current !== key) {
      countRef.current = -1;
    }
    prevKeyRef.current = key;
    countRef.current += 1;
    const index = countRef.current! % length;
    onChange(item[index] as string, countRef.current === 0);
  };
  return (
    <div className="keybroad-wapper">
      {keys.map((row) => {
        return (
          <div className="key-list" key={row[0] as unknown as string}>
            {row.map((item) => {
              const [number, ...rest] = item;
              return (
                <div
                  key={number}
                  className="key-item"
                  onClick={() => handleKeyClick(number as string, item as unknown as string[])}>
                  <span>{number}</span>
                  <span>{rest.join('')}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
