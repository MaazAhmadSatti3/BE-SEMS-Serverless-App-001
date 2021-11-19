export default {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    age: { type: "number" },
    dob: { type: "string" },
  },
} as const;
