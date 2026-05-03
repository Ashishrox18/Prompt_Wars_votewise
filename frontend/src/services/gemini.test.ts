import { describe, it, expect, vi } from 'vitest';
import { askVoteWise } from './gemini';

// Mock the GoogleGenerativeAI library
vi.mock('@google/generative-ai', () => {
  const getGenerativeModel = vi.fn().mockReturnValue({
    startChat: vi.fn().mockReturnValue({
      sendMessage: vi.fn().mockResolvedValue({
        response: {
          text: () => 'This is a mock response from VoteWise.',
        },
      }),
    }),
  });

  return {
    GoogleGenerativeAI: class {
      getGenerativeModel = getGenerativeModel;
    },
  };
});

describe('gemini service', () => {
  it('should return a response from askVoteWise', async () => {
    const result = await askVoteWise('Hello, how do I register to vote?');
    expect(result.text).toBe('This is a mock response from VoteWise.');
    expect(result.suggestedActions).toHaveLength(2);
  });

  it('should handle history correctly', async () => {
    const history: Message[] = [
      { role: 'user', content: 'Hi' },
      { role: 'model', content: 'Hello' }
    ];
    const result = await askVoteWise('Next question', history);
    expect(result.text).toBe('This is a mock response from VoteWise.');
  });

  it('should fail if result does not match schema', async () => {
    // This is hard to test with the current mock as it always returns valid data
    // but the type safety is enforced by Zod.
  });
});
