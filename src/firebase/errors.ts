// Defines the shape of the context object that provides detailed information
// about a Firestore Security Rule denial.
export type SecurityRuleContext = {
  // The path of the Firestore document or collection being accessed.
  path: string;
  // The type of operation being performed (e.g., 'get', 'list', 'create', 'update', 'delete').
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  // Optional data associated with the request, such as the document being created or updated.
  requestResourceData?: any;
};

// A custom error class for Firestore permission errors.
// This class extends the standard Error class and adds a `context` property
// to hold detailed information about the security rule denial.
export class FirestorePermissionError extends Error {
  // The context of the security rule denial.
  public context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    // Construct the error message that will be displayed in the Next.js error overlay.
    // The message includes a clear title and a JSON representation of the security rule context.
    const message = `
FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(context, null, 2)}
`;
    // Call the parent Error constructor with the detailed message.
    super(message);
    // Set the name of the error for easier identification.
    this.name = 'FirestorePermissionError';
    // Store the security rule context.
    this.context = context;
  }
}
