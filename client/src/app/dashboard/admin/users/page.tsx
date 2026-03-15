/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl, authHeaders } from "@/lib/api";
import ConfirmModal from "@/components/shared/ConfirmModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "admin" | "super_admin";
  isActive: "active" | "inactive" | "blocked";
  isDeleted: boolean;
  createdAt: string;
}

export default function UsersManagementPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Modal State
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant: "primary" | "danger" | "warning";
    loading: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    variant: "primary",
    loading: false,
  });

  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
        });
        if (searchTerm) query.append("searchTerm", searchTerm);

        const res = await fetch(
          `${getApiUrl()}/user/all-users?${query.toString()}`,
          {
            headers: authHeaders(),
          },
        );
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
          setPagination((prev) => ({
            ...prev,
            page: data.meta?.page || page,
            total: data.meta?.total || 0,
            totalPages: data.meta?.totalPage || 1,
          }));
        } else {
          throw new Error(data.message || "Failed to fetch users");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchTerm],
  );

  useEffect(() => {
    fetchUsers(pagination.page);
  }, [fetchUsers, pagination.page]);

  const handleUpdateUser = async (userId: string, payload: Partial<User>) => {
    // Only show confirmation modal for sensitive changes (Role or Blocked status)
    const isSensitive =
      payload.role ||
      payload.isActive === "blocked" ||
      payload.isActive === "active" ||
      payload.isActive === "inactive";

    if (isSensitive) {
      setModal({
        isOpen: true,
        title: payload.role ? "Change User Role" : "Block User",
        message: payload.role
          ? `Are you sure you want to change this user's role to ${payload.role}?`
          : "Blocking this user will prevent them from accessing their account. Proceed?",
        variant: payload.isActive === "blocked" ? "danger" : "warning",
        loading: false,
        onConfirm: () => executeUpdate(userId, payload),
      });
      return;
    }

    executeUpdate(userId, payload);
  };

  const executeUpdate = async (userId: string, payload: Partial<User>) => {
    setModal((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(`${getApiUrl()}/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, ...payload } : u)),
        );
        setModal((prev) => ({ ...prev, isOpen: false }));
      } else {
        setModal({
          isOpen: true,
          title: "Update Failed",
          message: data.message || "Failed to update user",
          variant: "danger",
          loading: false,
          onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
        });
      }
    } catch {
      setModal({
        isOpen: true,
        title: "Network Error",
        message: "Could not connect to the server to update user.",
        variant: "danger",
        loading: false,
        onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
      });
    } finally {
      setModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setModal({
      isOpen: true,
      title: "Delete User Account",
      message:
        "Are you sure you want to delete this user? This action is permanent and cannot be undone.",
      variant: "danger",
      loading: false,
      onConfirm: () => executeDelete(userId),
    });
  };

  const executeDelete = async (userId: string) => {
    setModal((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(`${getApiUrl()}/user/${userId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u._id !== userId));
        setModal((prev) => ({ ...prev, isOpen: false }));
      } else {
        setModal({
          isOpen: true,
          title: "Deletion Failed",
          message: data.message || "Failed to delete user",
          variant: "danger",
          loading: false,
          onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
        });
      }
    } catch {
      setModal({
        isOpen: true,
        title: "Network Error",
        message: "Could not connect to the server to delete user.",
        variant: "danger",
        loading: false,
        onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
      });
    } finally {
      setModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const canManage = (user: User) => {
    if (currentUser?.role === "super_admin") {
      // Super admin can manage everyone except maybe other super admins?
      // For now, let's say they can manage everyone.
      return true;
    }
    if (currentUser?.role === "admin") {
      // Admin can only manage candidates
      return user.role === "candidate";
    }
    return false;
  };

  if (loading && users.length === 0) {
    return (
      <div className='p-8 text-center text-text-body'>Loading users...</div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-text-dark'>User Management</h1>
          <p className='text-text-body text-sm mt-1'>
            Manage roles, status, and accounts.
          </p>
        </div>
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers(1)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {error ? (
        <div className='p-6 bg-red-50 text-red-600 rounded-xl border border-red-100'>
          {error}
        </div>
      ) : (
        <div className='bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='px-6 py-4 text-sm font-bold text-text-dark uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-4 text-sm font-bold text-text-dark uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='px-6 py-4 text-sm font-bold text-text-dark uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-sm font-bold text-text-dark uppercase tracking-wider'>
                    Joined
                  </th>
                  <th className='px-6 py-4 text-sm font-bold text-text-dark uppercase tracking-wider text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm'>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-text-dark'>
                            {user.name}
                          </p>
                          <p className='text-xs text-text-body'>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <select
                        value={user.role}
                        disabled={!canManage(user)}
                        onChange={(e) =>
                          handleUpdateUser(user._id, {
                            role: e.target.value as any,
                          })
                        }
                        className='text-xs font-semibold bg-primary/5 text-primary px-2 py-1 rounded border-none focus:ring-1 focus:ring-primary outline-none disabled:opacity-50'>
                        <option value='candidate'>Candidate</option>
                        <option value='admin'>Admin</option>
                        {currentUser?.role === "super_admin" && (
                          <option value='super_admin'>Super Admin</option>
                        )}
                      </select>
                    </td>
                    <td className='px-6 py-4'>
                      <select
                        value={user.isActive}
                        disabled={!canManage(user)}
                        onChange={(e) =>
                          handleUpdateUser(user._id, {
                            isActive: e.target.value as any,
                          })
                        }
                        className={`text-xs font-semibold px-2 py-1 rounded border-none focus:ring-1 outline-none disabled:opacity-50 ${
                          user.isActive === "active"
                            ? "bg-green-50 text-green-700"
                            : user.isActive === "blocked"
                              ? "bg-red-50 text-red-700"
                              : "bg-gray-50 text-gray-700"
                        }`}>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                        <option value='blocked'>Blocked</option>
                      </select>
                    </td>
                    <td className='px-6 py-4 text-sm text-text-body'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={!canManage(user)}
                        className='text-red-500 hover:text-red-700 font-bold text-sm disabled:opacity-30 transition-colors'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className="flex items-center gap-4">
              <span className='text-sm text-text-body'>
                Showing{" "}
                <span className='font-semibold text-text-dark'>
                  {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                of <span className="font-semibold text-text-dark">{pagination.total}</span> users
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-body font-medium">Show</span>
                <select
                  value={pagination.limit}
                  onChange={(e) => {
                    const newLimit = parseInt(e.target.value);
                    setPagination(p => ({ ...p, limit: newLimit, page: 1 }));
                  }}
                  className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-text-dark focus:outline-none"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page - 1 }))
                }
                disabled={pagination.page === 1}
                className='px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-text-dark hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm'>
                Previous
              </button>
              <button
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page + 1 }))
                }
                disabled={pagination.page === pagination.totalPages}
                className='px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-text-dark hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm'>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
        loading={modal.loading}
      />
    </div>
  );
}
