interface IOption {
  index: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
  children: React.ReactNode;
}

export default IOption;
