import styles from './loading.module.css';

const MealsLoadingPage = function MealsLoadingPage() {
  return <p className={styles.loading}>Fetcing Meals...</p>;
};

export default MealsLoadingPage;
