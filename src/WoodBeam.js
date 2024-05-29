import woodBeamImage from "./images/backgrounds/wood_beam.png";

export default function WoodBeam(){
  let component_style = {'backgroundImage':`url(${woodBeamImage})`};
  return (
    <div className="woodBeam" style={component_style} />
  )
}
