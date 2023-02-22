import { Typography } from "@mui/material";
import "./Hero.css";

function Hero(props) {
  const { image, title, subtitle, align, position } = props;

  return (
    <div className="blogHeroContent">
      <div className="blogHeroTitle" style={{textAlign: align}}>
        <Typography variant="h2" sx={{fontSize: "40px"}} gutterBottom>{title}</Typography>
        <Typography variant="h5" sx={{fontSize: "20px"}} paragraph>{subtitle}</Typography>
      </div>
      <div className="blogHeroImage"><img src={image} alt="hero" className="heroImage" style={{transform: "translateY("+(position-50)+"%)"}}/></div>
    </div>
  )
}

export default Hero;