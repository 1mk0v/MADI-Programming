class Checking {

    firstCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug) {
        if (maxLitersOfFirstJug == 0 || maxLitersOfSecondJug == 0) {
            return false;
        } else {
            return true;
        }
    }

    secondCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug, requiredLiters) {
        if ((requiredLiters > maxLitersOfFirstJug && requiredLiters > maxLitersOfSecondJug)) {
            return "err3";
        }

        if ((requiredLiters < 0 || maxLitersOfFirstJug < 0 || maxLitersOfSecondJug < 0)) {
            return "err4"
        }

        //Если оба числа четные, тогда мы можем найти только четное количество литров
        if ((maxLitersOfFirstJug % 2 == 0) && (maxLitersOfSecondJug % 2 == 0) && (requiredLiters % 2 != 0)) {
            return "err1";
        }

        //Eсли оба числа нечетные, тогда мы можем найти только нечетное количество литров
        if ((maxLitersOfFirstJug % 2 != 0) && (maxLitersOfSecondJug % 2 != 0) && (requiredLiters % 2 == 0)){
            return "err2";
        }

        if (maxLitersOfFirstJug == maxLitersOfSecondJug && maxLitersOfFirstJug != requiredLiters) {
            return "err5";
        }
    }
}


let check = new Checking;