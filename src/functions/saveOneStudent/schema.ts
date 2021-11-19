export default {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    age: { type: "number" },
    dob: { type: "string" },
  },
  required: ["name", "email", "age", "dob"],
} as const;
