<template>
  <FlexItem class="content-header" fld="row" h="6rem" w="100%">
    <CommonArticle :label="'경력'" class="ca" w="90%"></CommonArticle>
    <div class="btns">
      <ButtonItem h="3rem" w="12rem" bgc="#003566" br="0.6rem" c="#fff" :fs="'1rem'" @click="deleteSelectedRows">
        <img src="../../../assets/icons/minus_icon.png" />
        <p>선택 삭제</p></ButtonItem>
      <ButtonItem h="3rem" w="10rem" bgc="#003566" br="0.6rem" c="#fff" :fs="'1rem'" @click="addRow">
        <img src="../../../assets/icons/plus_icon.png" />
        <p>행 추가</p></ButtonItem>
      <ButtonItem h="3rem" w="10rem" bgc="#003566" br="0.6rem" c="#fff" :fs="'1rem'" @click="postData">수정 요청</ButtonItem>
    </div>
  </FlexItem>
  <FlexItem class="content-body" fld="column" h="calc(100% - 3rem)" w="100%">
    <div class="table-wrapper">
      <TableItem class="commute-table" gtc="0.2fr 1fr 1fr 1fr 1fr" br="0.5rem">
        <TableRow>
          <TableCell th fs="1.6rem">
            <div class="chk">
              <input type="checkbox" id="headerCheckbox" v-model="headerCheckbox" @change="toggleAllCheckboxes" />
              <label for="headerCheckbox"></label>
            </div>
          </TableCell>
          <TableCell th fs="1.6rem">회사명</TableCell>
          <TableCell th fs="1.6rem">직책</TableCell>
          <TableCell th fs="1.6rem">입사일</TableCell>
          <TableCell th fs="1.6rem">퇴사일</TableCell>
        </TableRow>
        <TableRow v-if="!isEmpty" v-for="(item, index) in careerList" :key="index">
          <TableCell class="mid" fs="1.6rem">
            <div class="chk">
              <input
                type="checkbox"
                :id="'check' + index"
                v-model="selectedRows[index]"
              />
              <label :for="'check' + index"></label>
            </div>
          </TableCell>
          <TableCell class="mid" fs="1.6rem">
            <input
              type="text"
              v-model="careerList[index]['company_name']"
              :class="{ 'invalid-row': !isCellValid(careerList[index]['company_name'], 'company_name') }"
              class="cell-input"
            />
          </TableCell>
          <TableCell class="mid" fs="1.6rem">
            <input
              type="text"
              v-model="careerList[index]['role_name']"
              :class="{ 'invalid-row': !isCellValid(careerList[index]['role_name'], 'role_name') }"
              class="cell-input"
            />
          </TableCell>
          <TableCell class="mid" fs="1.6rem">
            <input
              type="text"
              v-model="careerList[index]['join_date']"
              :class="{ 'invalid-row': !isCellValid(careerList[index]['join_date'], 'join_date') }"
              class="cell-input"
            />
          </TableCell>
          <TableCell class="mid" fs="1.6rem">
            <input
              type="text"
              v-model="careerList[index]['resignation_date']"
              :class="{ 'invalid-row': !isCellValid(careerList[index]['resignation_date'], 'resignation_date') }"
              class="cell-input"
            />
          </TableCell>
        </TableRow>
      </TableItem>
    </div>
    <FlexItem
      v-if="isEmpty"
      class="empty-message"
      fld="row"
      h="6rem"
      w="100%"
      fs="1.6rem"
    >
      경력 정보가 존재하지 않습니다.
    </FlexItem>
  </FlexItem>
</template>
  
<script setup>
import CommonArticle from '@/components/common/CommonArticle.vue'
import ButtonItem from '@/components/semantic/ButtonItem.vue';
import FlexItem from '@/components/semantic/FlexItem.vue';
import TableItem from '@/components/semantic/TableItem.vue';
import TableRow from '@/components/semantic/TableRow.vue';
import TableCell from '@/components/semantic/TableCell.vue';
import { updateData, getCareersById } from '@/api/emp_attach';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const careerList = ref([]);
const isEmpty = ref(true);
const headerCheckbox = ref(false);
const selectedRows = ref([]);

const router = useRouter();

const empId = ref('');

onMounted(() => {
  empId.value = localStorage.getItem('employeeId');
  fetchDate(empId.value);
});

const isCellValid = (value, header) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (header === 'join_date' || header === 'resignation_date') {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
  return String(value).length > 0;
};

const sortByDate = (list) => {
  return list.sort((a, b) => {
    const dateA = new Date(a['join_date']);
    const dateB = new Date(b['join_date']);
    return dateA - dateB;
  });
};

const fetchDate = async () => {
  const response = await getCareersById(empId.value);

  if (response) {
    const sortedResponse = sortByDate(response);
    careerList.value = sortedResponse;
    isEmpty.value = careerList.value.length === 0;
  } else {
    careerList.value = [];
    isEmpty.value = true;
  }
  initializeSelectedRows();
};

watch(careerList, () => {
  isEmpty.value = careerList.value.length === 0;
  initializeSelectedRows();
});

const initializeSelectedRows = () => {
  selectedRows.value = careerList.value.map(() => false);
  headerCheckbox.value = false;
};

const toggleAllCheckboxes = () => {
  selectedRows.value = selectedRows.value.map(() => headerCheckbox.value);
};

const defaultRow = {
  company_name: '',
  role_name: '',
  join_date: '',
  resignation_date: '',
};

const addRow = () => {
  careerList.value.push({ ...defaultRow });
  initializeSelectedRows();
};

const deleteSelectedRows = () => {
  careerList.value = careerList.value.filter((_, index) => !selectedRows.value[index]);
  initializeSelectedRows();
};

const mapping = () => {
  return careerList.value.map((row) => ({
    ...row,
    employee_id: empId.value,
  }));
};

const postData = async () => {
  const invalidRows = careerList.value.filter((row) => {
    return Object.entries(row).some(([header, value]) => !isCellValid(value, header));
  });

  if (invalidRows.length>0) {
    window.alert("유효하지 않은 데이터가 있습니다. 데이터를 확인하세요.");
    return;
  }

  const data = mapping();
  try {
    await updateData(data, 'careers');
    window.alert("경력 정보 수정 요청이 완료되었습니다.");
    router.push('/hr-basic/my-info/careers');
    return;
  } catch (error) {
    window.alert("수정 요청 중 문제가 발생했습니다. 다시 시도하세요.");
  }
};

</script>
  
<style scoped>
.content-header {
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: end;
}

.content-header ::v-deep(article > div.article-label) {
  font-size: 2rem !important;
}

.ca {
  margin-left: 2rem;
}

.content-body {
  width: 80%;
  margin-top: 1rem;
}

.btns {
  display: flex;
  gap: 1rem;
}

button {
  width: 100px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #003566;
  border: none;
  color: #FFF;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1px;
}

button p {
  text-align: center;
  vertical-align: middle;
}

.mid {
  justify-content: center;
  align-items: center;
}

.empty-message {
  justify-content: center;
  align-items: center;
}

.TableCell {
  overflow: visible;
  text-align: center;
  vertical-align: middle;
}

.chk {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: 100%;
  height: 100%;
  text-align: center;
  flex-shrink: 0;
  border-radius: 1px;
  border: 0.586px solid #DBDBDB;
  background: #F8F8F8;
  box-shadow: 0px 0.977px 1.954px 0px rgba(0, 0, 0, 0.25) inset;
}
.chbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.chbox > label {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #DBDBDB;
  position: relative;
}

input[type="checkbox"]:checked + label::after {
  content: '✔';
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}

.invalid-row {
  background: #FFD8D8 !important;
  stroke: #F00 !important;
  border: 2px solid red !important;
}
</style>
  