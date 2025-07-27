// formProgress.js

/**
 * Групи для перевірки заповнення форми
 * Кожна група — масив ключів formData
 */
const GROUPS = [
  // дані1
  { name: 'cardStyle/cardMood/photoFile', keys: ['cardStyle', 'cardMood', 'photoFile'] },
  // дані2
  { name: 'cardStyle/cardMood + photoFile', keys: ['cardStyle', 'cardMood', 'photoFile'], requireAll: true },
  // дані3
  { name: 'gender/age/person', keys: ['gender', 'age', 'person'], minFilled: 2 },
  // дані4
  { name: 'hobbies/hobbiesDescription/customHobby', keys: ['hobbies', 'hobbiesDescription', 'customHobby'] },
  // дані5
  { name: 'traits/customTrait', keys: ['traits', 'customTrait'] },
  // дані6
  { name: 'greetingSubject/customGreetingSubject', keys: ['greetingSubject', 'customGreetingSubject'] },
  // дані7
  { name: 'greetingText', keys: ['greetingText'] },
];

/**
 * Перевіряє, чи група заповнена
 * @param {object} formData
 * @param {object} group
 * @returns {boolean}
 */
function isGroupFilled(formData, group) {
  if (group.requireAll) {
    // Для дані2: всі ключі мають бути заповнені
    return group.keys.every((key) => {
      if (key === 'photoFile') return !!formData[key];
      return formData[key] && formData[key].toString().trim() !== '';
    });
  }
  if (group.minFilled) {
    // Для груп з minFilled: має бути заповнено мінімум group.minFilled полів
    let filledCount = group.keys.reduce((acc, key) => {
      if (Array.isArray(formData[key])) return acc + (formData[key].length > 0 ? 1 : 0);
      if (key === 'photoFile') return acc + (!!formData[key] ? 1 : 0);
      return acc + (formData[key] && formData[key].toString().trim() !== '' ? 1 : 0);
    }, 0);
    return filledCount >= group.minFilled;
  }
  // Для інших: хоча б один ключ заповнений
  return group.keys.some((key) => {
    if (Array.isArray(formData[key])) return formData[key].length > 0;
    if (key === 'photoFile') return !!formData[key];
    return formData[key] && formData[key].toString().trim() !== '';
  });
}

/**
 * Розраховує рівень заповнення форми
 * @param {object} formData
 * @returns {object} { score, filledGroups, unfilledGroups }
 */
export function getFormProgress(formData) {
  const filledGroups = [];
  const unfilledGroups = [];

  GROUPS.forEach((group, idx) => {
    if (isGroupFilled(formData, group)) {
      filledGroups.push(group.name);
    } else {
      unfilledGroups.push(group.name);
    }
  });

  return {
    score: filledGroups.length,
    filledGroups,
    unfilledGroups,
  };
} 