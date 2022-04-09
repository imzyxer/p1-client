class CCEntity {
  maskCardNumber = (val: string): string => `•••• ${val.slice(val.length - 4)}`;

  clearCardNumber = (val: string) => val.replace(/[^\d]/g, '').slice(0, 16);

  formatCardNumber = (val: string) =>
    this.clearCardNumber(val)
      .replace(/(.{4})/g, '$1 ')
      .trim();
}

export default new CCEntity();
