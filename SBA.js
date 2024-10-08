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
      score: 80,
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

function mismatchID(course, ag) {
  try {
    if (course.id !== ag.course_id) {
      throw new Error(
        `Mismatch: Course ID ${course.id} does not match Course Info ${ag.course_id}`
      );
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

function dataErrors(ag) {
  try {
    for (let i = 0; i < ag.assignments.length; i++) {
      if (ag.assignments[i].points_possible === 0) {
        throw new Error("Invalid data input");
      }
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

function incorrectValue(submissions) {
  try {
    for (let i = 0; i < submissions.length; i++) {
      if (typeof submissions[i].submission.score !== "number") {
        throw new Error("Invalid data type input");
      }
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

function isAssignmentDue(submitted_date) {
  const now = new Date();

  return new Date(submitted_date) <= now;
}

function lateSubmission(ag, submissions) {}

function getLearnerData(course, ag, submissions) {
  let result = [];

  //   Validation
  mismatchID(course, ag);
  dataErrors(ag);
  incorrectValue(submissions);

  for (let i = 0; i < submissions.length; i++) {
    // Check if the assignment is Due
    let isDue = isAssignmentDue(submissions[i].submission.submitted_at);

    // Deduct Points if it is due

    result.push(submissions[i].learner_id);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("result: ", result);
