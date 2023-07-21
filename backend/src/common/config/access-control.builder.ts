import { AppResource } from '@common/constants/resource';
import { AppRoles } from '@common/constants/role';
import { RolesBuilder } from 'nest-access-control';

export const RoleBuilder: RolesBuilder = new RolesBuilder();

RoleBuilder.grant(AppRoles.SUPER_ADMIN)
  .createOwn([AppResource.DESIGN, AppResource.MODEL, AppResource.TEMPLATE])
  .deleteOwn([AppResource.DESIGN, AppResource.MODEL, AppResource.TEMPLATE])
  .readAny([AppResource.DESIGN, AppResource.MODEL, AppResource.TEMPLATE])
  .updateAny([AppResource.DESIGN, AppResource.MODEL, AppResource.TEMPLATE])
  .grant(AppRoles.USER)
  .createOwn([AppResource.DESIGN])
  .readAny([AppResource.DESIGN, AppResource.MODEL, AppResource.TEMPLATE])
  .updateAny([AppResource.DESIGN]);
