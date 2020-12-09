export interface PatternsState {
  presetPatterns: string[];
  selectedPattern: string;
}

export const initialState: PatternsState = {
  presetPatterns: [
    'Empty',
    'Glider',
    'Small Exploder',
    'Exploder',
    'Ten Cell Row',
    'Lightweight Spaceship',
    'Block',
    'Tub',
    'Boat'
  ],
  selectedPattern: 'Empty'
};
