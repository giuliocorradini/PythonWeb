function update_status_ui(response) {
    var stats = JSON.parse(response);

    /* CPU */
    cpu_count = document.getElementById("cpu_count");
    cpu_load = document.getElementById("cpu_load");
    cpu_load_progress = document.getElementById("cpu_load_prog");

    cpu_count.innerText = stats.cpu.count;
    avg_load = stats.cpu.load[1] / stats.cpu.count * 100;//TODO: selectable timespan for average load
    cpu_load.innerText = avg_load;
    cpu_load_progress.value = avg_load;


    /* RAM */
    ram_total = document.getElementById("ram_total");
    ram_avail = document.getElementById("ram_avail");
    ram_used_perc = document.getElementById("ram_used");

    ram_total.innerText = stats.ram[0];
    ram_avail.innerText = stats.ram[1];
    ram_used_perc.innerText = stats.ram[2];


    /* Disk */
    disk_total = document.getElementById("disk_total");
    disk_used = document.getElementById("disk_used");
    disk_avail = document.getElementById("disk_avail");

    disk_total.innerText = stats.disk[0] / 1000000000;
    disk_used.innerText = stats.disk[1] / 1000000000;
    disk_avail.innerText = stats.disk[2] / 1000000000;


    /* Network */
    b_sent = document.getElementById("nic_byte_sent");
    b_recv = document.getElementById("nic_byte_recv");
    pkt_sent = document.getElementById("nic_pack_sent");
    pkt_recv = document.getElementById("nic_pack_recv");

    b_sent.innerText = stats.net[0];
    b_recv.innerText = stats.net[1];
    pkt_sent.innerText = stats.net[2];
    pkt_recv.innerText = stats.net[3];

    /* Boot */
    boot_time = document.getElementById("boot_time");
    var boot_time_val = new Date(stats.boot * 1000);
    boot_time.innerText = boot_time_val.toLocaleString();

}

/* Collapsible objects */
function collapse(button, force=false, action="collapse") {
    var root = button.parentNode;
    var content = root.getElementsByClassName("collapsible-content")[0];

    if((!force && content.classList.contains("collapsed")) || (force && action=="show")) {   //Show
        content.classList.remove("collapsed");
        button.classList.add("active");
    } else {    //Collapse
        content.classList.add("collapsed");
        button.classList.remove("active");
    }
}

var collapse_action = false;
function collapse_all() {
    var collapsibles = document.getElementsByClassName("collapsible");
    for (let element of collapsibles) {
        if(collapse_action) {
            collapse(element, true, "collapse");
        } else {
            collapse(element, true, "show");
        }
    }
    collapse_action ^= true;
}