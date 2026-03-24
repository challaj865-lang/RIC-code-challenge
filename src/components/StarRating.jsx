import React from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ rating, max = 5 }) {
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className={styles.star}>
            <svg viewBox="0 0 24 24" width="14" height="14">
              <defs>
                <linearGradient id={`grad-${i}-${rating}`}>
                  <stop offset={`${fill * 100}%`} stopColor="var(--accent)" />
                  <stop offset={`${fill * 100}%`} stopColor="var(--border)" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#grad-${i}-${rating})`}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </span>
        );
      })}
      <span className={styles.value}>{rating.toFixed(1)}</span>
    </div>
  );
}
