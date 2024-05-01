/**
 * @jest-environment jsdom
 */

import { expect, it, describe, vi, beforeAll, afterAll } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAccountData } from "./useAccountData";

describe("useAccountData", () => {
  // spy on global fetch function
  const fetchSpy = vi.spyOn(window, "fetch");

  // run before all tests
  beforeAll(() => {
    // mock fetch response
    const mockResolve = {
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve([
            {
              _id: "1",
              account_name: "Checking",
              account_type: "Asset",
              balance: 1000,
              logo_url: "https://via.placeholder.com/150",
            },
          ])
        ),
    };
    fetchSpy.mockResolvedValue(mockResolve as any);
  });

  //Run after all the tests
  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it("should fetch accounts", async () => {
    const { result } = renderHook(() => useAccountData());

    expect(result.current.isLoading).toEqual(true);
    await waitFor(() => expect(result.current.accountData.length).toEqual(1));
    expect(result.current.isLoading).toEqual(false);
  });
});

// describe("useAccountData", () => {
//   it("should return account data", async () => {
//     const { result } = renderHook(() => useAccountData());

//     expect(result.current.accountData).toEqual([
//       {
//         _id: "1",
//         account_name: "Checking",
//         account_type: "Asset",
//         balance: 1000,
//         logo_url: "https://via.placeholder.com/150",
//       },
//     ]);
//   });
// });
