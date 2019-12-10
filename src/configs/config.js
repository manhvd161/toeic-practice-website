const pagination = {
  pageNumber: 1,
  recordNumber: 10,
};

const staticFilePath = `${__dirname}/../static`;

const ResponseResult = class {
  constructor(status = 1, results = {}) {
    this.status = status;
    this.results = results;
  }
};

/**
 * Toeic level
 */
const questionLevel = {
  BEGINNER: 0,
  ELEMENTARY: 1,
  // 246-380 TOEIC
  PRE_INTERMEDIATE: 2,
  LOWER_INTERMEDIATE: 3,
  // 381-540 TOEIC
  MID_INTERMEDIATE: 4,
  // 541-700 TOEIC
  UPPER_INTERMEDIATE: 5,
  // 701-910 TOEIC
  LOWER_ADVANCED: 6,
  // 911-990 TOEIC
  UPPER_ADVANDED: 7,
};

/**
 * Number of questions in part
 */
const numberQuestions = {
  NQPart1: 10,
  NQPart2: 30,
  NQPart3: 10,
  NQPart4: 10,
  NQPart5: 40,
  NQPart6: 4,
  NQPart7: 12,
};

module.exports = {
  pagination,
  staticFilePath,
  ResponseResult,
  questionLevel,
  numberQuestions,
};
