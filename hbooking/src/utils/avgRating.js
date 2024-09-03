const calculateAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return {
        totalRating: 0,
        averageRating: 'Not rated',
      };
    }
  
    const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
  
    return {
      totalRating,
      averageRating: totalRating === 1 ? totalRating : averageRating,
    };
  };
  
  export default calculateAvgRating;
  