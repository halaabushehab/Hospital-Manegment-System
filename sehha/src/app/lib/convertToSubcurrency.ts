function convertToSubcurrency(amount: number, factor = 100) {
    if (isNaN(amount) || amount < 0) {
      throw new Error("Amount must be a positive number.");
    }
    
    return Math.round(amount * factor);
  }
  
  export default convertToSubcurrency;
  