import "./Card.css";

const Card = (props) => {
   const { className } = props;

   return (
      <div className={`card ${className}`}>
         {props.children}
      </div>
   )
}
export default Card;