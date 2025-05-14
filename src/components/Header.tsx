import adjustHexColor from '../utils/adjustHexColor'

interface HeaderType {
  backGroundColor: string | null
  textColor: string | null
}
const Header = ({ backGroundColor, textColor }: HeaderType) => {
  // const darkerHeaderColor = adjustHexColor(backGroundColor, -60)
  const headerStyle = {
    color: textColor ? textColor : '#000000',
    backgroundColor: backGroundColor
      ? adjustHexColor(backGroundColor, -30)
      : '#4cb563',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  }
  return (
    <header style={headerStyle}>
      <button className="header_menu">Menu</button>
      <div className="logo_section">VIBE CAT</div>
      <a href="#">BUY</a>
    </header>
  )
}
export default Header
