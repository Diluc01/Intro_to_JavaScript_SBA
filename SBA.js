const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  let result = [];

  try {
    if (ag.course_id !== course.id) {
      throw new Error("invalid input");
    }

    for (let i = 0; i < ag.assignments.length; i++) {
      if (ag.assignments[i].points_possible === 0) {
        throw new Error("invalid number");
      }
    }
    for (let j = 0; j < submissions.length; j++) {
      if (typeof submissions[j].submission.score === String) {
        throw new Error("invalid input");
      }
    }

    if (ag.assignments === ag.assignments[2]) {
      ag.assignments.pop();
    }
    for (let k = 0; k < submissions.length; k++) {
      if (submissions[k].submission.submitted_at > ag.assignments[k]) {
        submissions[k].submission.score - submissions[k].submission.score * 0.1;
      }
    }
    for (let l = 0; l < submissions.length; l++) {
      result.push(submissions[l].learner_id);
    }
  } catch (err) {
    console.log(err);
  }
  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
