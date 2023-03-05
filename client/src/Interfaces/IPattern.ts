interface IPattern {
  patternContent: string;
  patternID: string;
  onClick: (event: React.MouseEvent) => void;
}

export default IPattern;
