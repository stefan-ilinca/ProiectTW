const workflows = [
    { id: 1, title: "Lead Qualification", active: true, trigger: "webhook" },
    { id: 2, title: "Daily Sales Report", active: true, trigger: "schedule" },
    { id: 3, title: "Customer Data Sync", active: false, trigger: "manual" }
];

const TRIGGERS = ["webhook", "schedule", "manual"];

function listTitles(items) {
    return items.map((workflow) => workflow.title);
}

function countActive(items) {
    return items.filter((workflow) => workflow.active).length;
}

function findWorkflowById(items, id) {
    return items.find((workflow) => workflow.id === id);
}

function searchByTitle(items, text) {
    const searchText = text.toLowerCase();
    return items.filter((workflow) => workflow.title.toLowerCase().includes(searchText));
}

function nextId(items) {
    return items.reduce((max, workflow) => Math.max(max, workflow.id), 0) + 1;
}

function addWorkflow(items, title, trigger = "schedule") {
    const cleanedTitle = title.trim();
    const cleanedTrigger = trigger.trim().toLowerCase();

    if (!cleanedTitle) {
        console.log("Validation: workflow name cannot be empty.");
        return items;
    }

    if (!TRIGGERS.includes(cleanedTrigger)) {
        console.log("Validation: trigger is invalid. Allowed values: webhook, schedule, manual.");
        return items;
    }

    const newWorkflow = {
        id: nextId(items),
        title: cleanedTitle,
        active: true,
        trigger: cleanedTrigger
    };

    return [...items, newWorkflow];
}

function toggleActive(items, id) {
    const workflowFound = findWorkflowById(items, id);

    if (!workflowFound) {
        console.log("No workflow found with id:", id);
        return items;
    }

    return items.map((workflow) => (workflow.id === id ? { ...workflow, active: !workflow.active } : workflow));
}

function deleteWorkflow(items, id) {
    return items.filter((workflow) => workflow.id !== id);
}

console.log("--- Read ---");
console.log("Titles:", listTitles(workflows).join(", "));
console.log("Active:", countActive(workflows));
console.log("Search 'lead':", listTitles(searchByTitle(workflows, "lead")).join(", "));

console.log("--- Add ---");
let list = addWorkflow(workflows, "Lead Nurturing", "webhook");
console.log("New list:", list.length, "workflows");
console.log("Original list remains:", workflows.length, "workflows");

console.log("--- Update and delete ---");
list = toggleActive(list, 1);
console.log("After toggling id 1, active:", countActive(list));
list = deleteWorkflow(list, 3);
console.log("After deleting id 3:", listTitles(list).join(", "));

console.log("--- Validation ---");
addWorkflow(list, " ");
addWorkflow(list, "Some workflow", "urgent");
