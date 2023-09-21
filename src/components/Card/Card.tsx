import styles from './Card.module.scss';

interface CardProps {
  title: string;
  name: string;
  src: string;
}

const Card = ({ title, name, src }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={`../.${src}`} alt={name} />
      <div className={styles.card_details}>
        <h2>{title}</h2>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Card;
