import { searchByQueries } from "../../helper/searchQuery";
import { user } from "../../models/user.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/AsyncHandler";

const GetAllUsers = asyncHandler(async (req, res) => {
  // Extracting query parameters
  const { skip, page, pageSize, searchQuery } = searchByQueries(req);

  // Fetching total users count for pagination purposes
  const totalUsers = await user.count();

  // Fetching users with pagination, search, and role/permission inclusion
  const allusers = await user.findMany({
    skip,
    take: pageSize,
    where: {
      OR: [{ name: { contains: searchQuery } }],
    },
    include: {
      roles: {
        include: {
          RolePermission: {
            include: {
              Permission: true, // Correct way to include Permission data
            },
          },
        },
      },
    },
  });

  // Checking if users were found
  if (!allusers || allusers.length === 0) {
    throw new ApiError(400, "Users not found");
  }

  // Sending response using ApiResponse with appropriate type
  res
    .status(200)
    .json(
      new ApiResponse<typeof allusers>(
        200,
        allusers,
        "All users fetched successfully"
      )
    );
});
