declare module '@eliza/core' {
    export interface Action {
        name: string;
        description: string;
        execute: (context: any) => Promise<{
            type: string;
            content: string;
        }>;
    }
    
    export class ElizaAgent {
        constructor(config: any);
        registerActions(actions: Action[]): Promise<void>;
        start(): Promise<void>;
    }
} 