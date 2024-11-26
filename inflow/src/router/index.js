import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
import ChatbotView from '@/views/chatbot/ChatbotView.vue';
import MyInfoView from '@/views/hr-basic/MyInfoView.vue';
import AttendanceView from '@/views/hr-basic/AttendanceView.vue';
import SalaryView from '@/views/hr-basic/SalaryView.vue';
import ContractView from '@/views/hr-basic/ContractView.vue';
import PersonalEvalView from '@/views/evaluation/PersonalEvalView.vue';
import LeaderEvalView from '@/views/evaluation/LeaderEvalView.vue';
import EvalTaskView from '@/views/evaluation/EvalTaskView.vue';
import EmployeeInfoView from '@/views/hr-management/EmployeeInfoView.vue';
import EmployeeUploadView from '@/views/hr-management/EmployeeUploadView.vue';
import DepartmentManagementView from '@/views/hr-management/DepartmentManagementView .vue';
import AppointmentManagementView from '@/views/hr-management/AppointmentManagementView.vue';
import EvalManagementView from '@/views/hr-management/EvalManagementView.vue';
import ContractManagementView from '@/views/hr-management/ContractManagementView.vue';
import VacationManagementView from '@/views/hr-management/VacationManagementView.vue';
import EmployeeSearchView from '@/views/emp-search/EmployeeSearchView.vue';
import StatisticsView from '@/views/statistics/StatisticsView.vue';
import LoginView from '@/views/login/LoginView.vue';
import CommuteView from '@/views/hr-basic/attendance/CommuteView.vue';
import RemoteView from '@/views/hr-basic/attendance/RemoteView.vue';
import OvertimeView from '@/views/hr-basic/attendance/OvertimeView.vue';
import LeaveView from '@/views/hr-basic/attendance/LeaveView.vue';
import ReturnView from '@/views/hr-basic/attendance/ReturnView.vue';
import BusinessTripView from '@/views/hr-basic/attendance/BusinessTripView.vue';
import DispatchView from '@/views/hr-basic/attendance/DispatchView.vue';
import VacationView from '@/views/hr-basic/attendance/VacationView.vue';
import VacationPaymentView from '@/views/hr-management/vacation/VacationPaymentView.vue';
import VacationPolicyView from '@/views/hr-management/vacation/VacationPolicyView.vue';
import CareerInfoUploadView from '@/views/hr-management/EmployeeUpload/CareerInfoUploadView.vue';
import EducationInfoUploadView from '@/views/hr-management/EmployeeUpload/EducationInfoUploadView.vue';
import QualificationInfoUploadView from '@/views/hr-management/EmployeeUpload/QualificationInfoUploadView.vue';
import LanguageTestInfoUploadView from '@/views/hr-management/EmployeeUpload/LanguageTestInfoUploadView.vue';
import DisciplineRewardInfoUploadView from '@/views/hr-management/EmployeeUpload/DisciplineRewardInfoUploadView.vue';
import FamilyMemberInfoUploadView from '@/views/hr-management/EmployeeUpload/FamilyMemberInfoUploadView.vue';
import MyDepartmentView from '@/views/hr-basic/MyDepartmentView.vue';
import EmployeeInfoUploadView from '@/views/hr-management/EmployeeUpload/EmployeeInfoUploadView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/emp-search',
    name: 'emp-search',
    component: EmployeeSearchView,
  },
  {
    path: '/chatbot',
    name: 'chatbot',
    component: ChatbotView,
  },
  {
    path: '/hr-basic',
    name: 'hr-basic',
    component: MyInfoView,
  },
  {
    path: '/hr-basic/my-info',
    name: 'hr-basic-my-info',
    component: MyInfoView,
  },
  {
    path: '/hr-basic/attendance',
    name: 'hr-basic-attendance',
    component: AttendanceView,
    children: [
      {
        path: '',
        name: 'hr-basic-attendance-default',
        component: CommuteView,
      },
      {
        path: 'commute',
        name: 'hr-basic-attendance-commute',
        component: CommuteView,
      },
      {
        path: 'remote',
        name: 'hr-basic-attendance-remote',
        component: RemoteView,
      },
      {
        path: 'overtime',
        name: 'hr-basic-attendance-overtime',
        component: OvertimeView,
      },
      {
        path: 'vacation',
        name: 'hr-basic-attendance-vacation',
        component: VacationView,
      },
      {
        path: 'leave',
        name: 'hr-basic-attendance-leave',
        component: LeaveView,
      },
      {
        path: 'return',
        name: 'hr-basic-attendance-return',
        component: ReturnView,
      },
      {
        path: 'business-trip',
        name: 'hr-basic-attendance-business-trip',
        component: BusinessTripView,
      },
      {
        path: 'dispatch',
        name: 'hr-basic-attendance-dispatch',
        component: DispatchView,
      },
    ]
  },
  {
    path: '/hr-basic/salary',
    name: 'hr-basic-salary',
    component: SalaryView,
  },
  {
    path: '/hr-basic/contract',
    name: 'hr-basic-contract',
    component: ContractView,
  },
  {
    path: '/hr-basic/my-department',
    name: 'hr-basic-my-department',
    component: MyDepartmentView,
  },
  {
    path: '/hr-management',
    name: 'hr-management',
    component: EmployeeInfoView,
  },
  {
    path: '/hr-management/employee/info',
    name: 'hr-management-employee-info',
    component: EmployeeInfoView,
  },
  {
    path: '/hr-management/employee/upload',
    name: 'hr-management-employee-upload',
    component: EmployeeUploadView,
    children: [
      {
        path: 'employees',
        name: 'EmployeeInfo',
        component: EmployeeInfoUploadView,
      },
      {
        path: 'careers',
        name: 'CareerInfo',
        component: CareerInfoUploadView,
      },
      {
        path: 'educations',
        name: 'EducationInfo',
        component: EducationInfoUploadView,
      },
      {
        path: 'qualifications',
        name: 'QualificationInfo',
        component: QualificationInfoUploadView,
      },
      {
        path: 'languagetests',
        name: 'LanguageTestInfo',
        component: LanguageTestInfoUploadView,
      },
      {
        path: 'disciplinerewards',
        name: 'DisciplineRewardInfo',
        component: DisciplineRewardInfoUploadView,
      },
      {
        path: 'familymembers',
        name: 'FamilyMemberInfo',
        component: FamilyMemberInfoUploadView,
      },
    ],
  },
  {
    path: '/hr-management/department',
    name: 'hr-management-department',
    component: DepartmentManagementView,
  },
  {
    path: '/hr-management/appointment',
    name: 'hr-management-appointment',
    component: AppointmentManagementView,
  },
  {
    path: '/hr-management/evaluation',
    name: 'hr-management-evaluation',
    component: EvalManagementView,
  },
  {
    path: '/hr-management/contract',
    name: 'hr-management-contract',
    component: ContractManagementView,
  },
  {
    path: '/hr-management/vacation',
    name: 'hr-management-vacation',
    component: VacationManagementView,
    children: [
      {
        path: '',
        name: 'hr-management-vacation-default',
        component: VacationPaymentView,
      },
      {
        path: 'payment',
        name: 'hr-management-vacation-payment',
        component: VacationPaymentView,
      },
      {
        path: 'policy',
        name: 'hr-management-vacation-policy',
        component: VacationPolicyView,
      },
    ]
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: PersonalEvalView,
  },
  {
    path: '/evaluation/personal',
    name: 'personal-evaluation',
    component: PersonalEvalView,
  },
  {
    path: '/evaluation/leader',
    name: 'leader-evaluation',
    component: LeaderEvalView,
  },
  {
    path: '/evaluation/task',
    name: 'evaluation-task',
    component: EvalTaskView,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
