
export class RateLimiter {
  private limit: number;
  private interval: number;
  private requests: number[];

  constructor(limit: number, interval: number) {
    this.limit = limit;
    this.interval = interval;
    this.requests = [];
  }

  private canMakeRequest(): boolean {
    const now = Date.now();
    // Remove requests that are outside the current interval
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.interval
    );
    // Check if the limit has been exceeded
    return this.requests.length < this.limit;
  }

  public makeRequest(callback: () => void): void {
    if (this.canMakeRequest()) {
      this.requests.push(Date.now());
      callback();
    } else {
      console.log('Rate limit exceeded. Please try again later.');
    }
  }
}
