import { makeAutoObservable } from 'mobx';
import autosave from 'core/misc/autosave';

class AuthStore {
    information = null;
    rolesCompleteList = [];

    constructor() {
        makeAutoObservable(this);
        autosave(this, '_auth_store_cache');
    }

    hasRole(role) {
        if (!this.information || !this.rolesCompleteList.length)
            return false;
        return (
            this.information.administratorRoleIds.includes(
                this.rolesCompleteList.find((item) => item.name === role)?.id
            )
        );
    }

    permitted(permission) {
        if (!this.information || !this.rolesCompleteList.length)
            return false;

        for (let i = 0; i < this.rolesCompleteList.length; i++)
            if (this.information.administratorRoleIds.includes(this.rolesCompleteList[i].id) &&
                this.rolesCompleteList[i].permissions.includes(permission))
                return true;
        return false;
    }

    setInformation(values) { this.information = values; }
    setRolesCompleteList(values) { this.rolesCompleteList = values; }
}

export default new AuthStore();
