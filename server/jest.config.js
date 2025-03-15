export default {
  transform: {}, // Prevent Jest from trying to transform ESM
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".mjs"],
};
