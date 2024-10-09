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

function mismatchID(course, assignmentGroup) {
  try {
    if (course.id !== assignmentGroup.course_id) {
      throw new Error(
        `Mismatch: Course ID ${course.id} does not match Course Info ${assignmentGroup.course_id}`
      );
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

function dataErrors(assignmentGroup) {
  try {
    for (let i = 0; i < assignmentGroup.assignments.length; i++) {
      if (assignmentGroup.assignments[i].points_possible === 0) {
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

function lateSubmission(submittedDate, dueDate) {
  let submitted = new Date(submittedDate);
  let due = new Date(dueDate);
  return submitted > due;
}

function getLearnerData(course, assignmentGroup, submissions) {
  let results = [];

  //   Validation
  mismatchID(course, assignmentGroup);
  dataErrors(assignmentGroup);
  incorrectValue(submissions);

  for (let i = 0; i < submissions.length; i++) {
    let submission = submissions[i];
    let learnerId = submission.learner_id;
    let assignmentId = submission.assignment_id;

    let assignment = null;
    for (let j = 0; j < assignmentGroup.assignments.length; j++) {
      if (assignmentGroup.assignments[j].id == assignmentId) {
        assignment = assignmentGroup.assignments[j];
        break;
      }
    }

    // Check if the assignment is Due
    if (assignment && isAssignmentDue(submissions[i].submission.submitted_at)) {
      let score = submission.submission.score;

      if (
        lateSubmission(submission.submission.submitted_at, assignment.due_at)
      ) {
        score = score * 0.9;
      }

      let percentageScore = (score / assignment.points_possible) * 100;

      let studentData = null;

      for (let x = 0; x < results.length; x++) {
        if (results[x].id == learnerId) {
          studentData = results[x];
        }
      }

      if (!studentData) {
        studentData = { id: learnerId, avg: 0 };
        results.push(studentData);
      }

      studentData[assignmentId] = percentageScore;

      console.log("studentData: ", studentData);
    }

    for (let i = 0; i < results.length; i++) {
      let individualStudentData = results[i];
      let totalScore = 0;
      let totalAssignments = 0;

      for (let j = 0; j < assignmentGroup.assignments.length; j++) {
        let assignmentId = assignmentGroup.assignments[j].id;
        if (individualStudentData.hasOwnProperty(assignmentId)) {
          totalScore += individualStudentData[assignmentId];
          totalAssignments++;
        }
      }

      individualStudentData.avg = totalScore / totalAssignments;
    }

    return results;
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("result: ", result);
