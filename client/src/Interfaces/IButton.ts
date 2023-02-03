interface IButton {
  id: string,
  label: string,
  onClick: () => void,
  bgColor?: string,
  borderColor?: string,
  textColor?: string,
  hoverTextColor?: string,
  hoverBorderColor?: string,
  hoverBgColor?: string,
}

export default IButton
