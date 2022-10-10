interface ClockState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
const initialState: ClockState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};

export const clock = (state: Partial<ClockState>) => {
  return {
    toSeconds: () => {
      const result = { ...initialState, ...state };
      return (
        result.milliseconds / 1000 +
        result.seconds +
        result.minutes * 60 +
        result.hours * 60 * 60 +
        result.days * 60 * 60 * 24
      );
    },
    toMilliseconds: () => {
      const result = { ...initialState, ...state };
      return (
        result.milliseconds +
        result.seconds * 1000 +
        result.minutes * 1000 * 60 +
        result.hours * 1000 * 60 * 60 +
        result.days * 1000 * 60 * 60 * 24
      );
    },
  };
};
