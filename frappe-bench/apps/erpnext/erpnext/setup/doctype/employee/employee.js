// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext.setup");
erpnext.setup.EmployeeController = class EmployeeController extends frappe.ui.form.Controller {
	setup() {
		this.frm.fields_dict.user_id.get_query = function (doc, cdt, cdn) {
			return {
				query: "frappe.core.doctype.user.user.user_query",
				filters: { ignore_user_type: 1 },
			};
		};
		this.frm.fields_dict.reports_to.get_query = function (doc, cdt, cdn) {
			return { query: "erpnext.controllers.queries.employee_query" };
		};
	}

	refresh() {
		erpnext.toggle_naming_series();
		frm.trigger('calculate_relieving_date'); // Ensure calculation on refresh
	}
};

frappe.ui.form.on("Employee", {
	onload: function (frm) {
		frm.set_query("department", function () {
			return {
				filters: {
					company: frm.doc.company,
				},
			};
		});
	},

	prefered_contact_email: function (frm) {
		frm.events.update_contact(frm);
	},

	personal_email: function (frm) {
		frm.events.update_contact(frm);
	},

	company_email: function (frm) {
		frm.events.update_contact(frm);
	},

	user_id: function (frm) {
		frm.events.update_contact(frm);
	},

	update_contact: function (frm) {
		var prefered_email_fieldname = frappe.model.scrub(frm.doc.prefered_contact_email) || "user_id";
		frm.set_value("prefered_email", frm.fields_dict[prefered_email_fieldname].value);
	},

	status: function (frm) {
		return frm.call({
			method: "deactivate_sales_person",
			args: {
				employee: frm.doc.employee,
				status: frm.doc.status,
			},
		});
	},

	create_user: function (frm) {
		if (!frm.doc.prefered_email) {
			frappe.throw(__("Please enter Preferred Contact Email"));
		}
		frappe.call({
			method: "erpnext.setup.doctype.employee.employee.create_user",
			args: {
				employee: frm.doc.name,
				email: frm.doc.prefered_email,
			},
			freeze: true,
			freeze_message: __("Creating User..."),
			callback: function (r) {
				frm.reload_doc();
			},
		});
	},

	// Resignation and Notice Period logic
	resignation_letter_date: function (frm) {
		frm.trigger('calculate_relieving_date');
	},

	notice_number_of_days: function (frm) {
		frm.trigger('calculate_relieving_date');
	},

	relieving_date: function (frm) {
		// Prevent manual changes if notice number of days is set
		if (frm.doc.notice_number_of_days) {
			// frappe.msgprint(__('Relieving Date will be automatically calculated based on the resignation date and notice period.'));
			frm.trigger('calculate_relieving_date');
		}
	},

	calculate_relieving_date: function (frm) {
		if (frm.doc.resignation_letter_date && frm.doc.notice_number_of_days) {
			// Calculate relieving date as resignation_letter_date + notice_number_of_days
			let resignation_letter_date = new Date(frm.doc.resignation_letter_date);
			let notice_days = parseInt(frm.doc.notice_number_of_days);

			// Add notice days to resignation letter date
			resignation_letter_date.setDate(resignation_letter_date.getDate() + notice_days);

			// Format the date to YYYY-MM-DD
			let formatted_date = resignation_letter_date.toISOString().split('T')[0];

			// Set the calculated relieving date in the form
			frm.set_value('relieving_date', formatted_date);

			// Ensure the field is refreshed
			frm.refresh_field('relieving_date');
		}
	}
});

cur_frm.cscript = new erpnext.setup.EmployeeController({
	frm: cur_frm,
});

frappe.tour["Employee"] = [
	{
		fieldname: "first_name",
		title: "First Name",
		description: __(
			"Enter First and Last name of Employee, based on Which Full Name will be updated. In transactions, it will be Full Name which will be fetched."
		),
	},
	{
		fieldname: "company",
		title: "Company",
		description: __("Select a Company this Employee belongs to."),
	},
	{
		fieldname: "date_of_birth",
		title: "Date of Birth",
		description: __(
			"Select Date of Birth. This will validate Employee's age and prevent hiring of under-age staff."
		),
	},
	{
		fieldname: "date_of_joining",
		title: "Date of Joining",
		description: __(
			"Select Date of joining. It will have an impact on the first salary calculation and Leave allocation on a pro-rata basis."
		),
	},
	{
		fieldname: "reports_to",
		title: "Reports To",
		description: __(
			"Here, you can select a senior of this Employee. Based on this, the Organization Chart will be populated."
		),
	},
];






// // Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// // License: GNU General Public License v3. See license.txt

// frappe.provide("erpnext.setup");
// erpnext.setup.EmployeeController = class EmployeeController extends frappe.ui.form.Controller {
// 	setup() {
// 		this.frm.fields_dict.user_id.get_query = function (doc, cdt, cdn) {
// 			return {
// 				query: "frappe.core.doctype.user.user.user_query",
// 				filters: { ignore_user_type: 1 },
// 			};
// 		};
// 		this.frm.fields_dict.reports_to.get_query = function (doc, cdt, cdn) {
// 			return { query: "erpnext.controllers.queries.employee_query" };
// 		};
// 	}

// 	refresh() {
// 		erpnext.toggle_naming_series();
// 	}
// };

// frappe.ui.form.on("Employee", {
// 	onload: function (frm) {
// 		frm.set_query("department", function () {
// 			return {
// 				filters: {
// 					company: frm.doc.company,
// 				},
// 			};
// 		});
// 	},
// 	prefered_contact_email: function (frm) {
// 		frm.events.update_contact(frm);
// 	},

// 	personal_email: function (frm) {
// 		frm.events.update_contact(frm);
// 	},

// 	company_email: function (frm) {
// 		frm.events.update_contact(frm);
// 	},

// 	user_id: function (frm) {
// 		frm.events.update_contact(frm);
// 	},

// 	update_contact: function (frm) {
// 		var prefered_email_fieldname = frappe.model.scrub(frm.doc.prefered_contact_email) || "user_id";
// 		frm.set_value("prefered_email", frm.fields_dict[prefered_email_fieldname].value);
// 	},

// 	status: function (frm) {
// 		return frm.call({
// 			method: "deactivate_sales_person",
// 			args: {
// 				employee: frm.doc.employee,
// 				status: frm.doc.status,
// 			},
// 		});
// 	},

// 	create_user: function (frm) {
// 		if (!frm.doc.prefered_email) {
// 			frappe.throw(__("Please enter Preferred Contact Email"));
// 		}
// 		frappe.call({
// 			method: "erpnext.setup.doctype.employee.employee.create_user",
// 			args: {
// 				employee: frm.doc.name,
// 				email: frm.doc.prefered_email,
// 			},
// 			freeze: true,
// 			freeze_message: __("Creating User..."),
// 			callback: function (r) {
// 				frm.reload_doc();
// 			},
// 		});
// 	},
// });

// cur_frm.cscript = new erpnext.setup.EmployeeController({
// 	frm: cur_frm,
// });

// frappe.tour["Employee"] = [
// 	{
// 		fieldname: "first_name",
// 		title: "First Name",
// 		description: __(
// 			"Enter First and Last name of Employee, based on Which Full Name will be updated. IN transactions, it will be Full Name which will be fetched."
// 		),
// 	},
// 	{
// 		fieldname: "company",
// 		title: "Company",
// 		description: __("Select a Company this Employee belongs to."),
// 	},
// 	{
// 		fieldname: "date_of_birth",
// 		title: "Date of Birth",
// 		description: __(
// 			"Select Date of Birth. This will validate Employees age and prevent hiring of under-age staff."
// 		),
// 	},
// 	{
// 		fieldname: "date_of_joining",
// 		title: "Date of Joining",
// 		description: __(
// 			"Select Date of joining. It will have impact on the first salary calculation, Leave allocation on pro-rata bases."
// 		),
// 	},
// 	{
// 		fieldname: "reports_to",
// 		title: "Reports To",
// 		description: __(
// 			"Here, you can select a senior of this Employee. Based on this, Organization Chart will be populated."
// 		),
// 	},
// ];
